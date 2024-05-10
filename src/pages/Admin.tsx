import { DocumentData } from "firebase/firestore";
import { Component } from "react";
import firebase from "../utilities/Firebase";
import * as Form from "../components/form";
import Button from "../components/Button";

class Admin extends Component<
  object,
  {
    pages: DocumentData[];
    page: DocumentData;
    disabled: boolean;
    new: { show: boolean; type?: string };
  }
> {
  constructor(props: object) {
    super(props);
    this.handleChangePage.bind(this);
    this.handleChangeContent.bind(this);
    this.handleSubmit.bind(this);
    this.handleNewType.bind(this);
    this.addElement.bind(this);
  }
  abortController = new AbortController();
  componentDidMount = (): void => {
    firebase.getAllDocs("pages").then((docs) => {
      firebase.getDoc("pages", docs[0].title).then((doc) => {
        this.setState({
          pages: docs,
          page: doc,
          disabled: true,
          new: { show: false },
        });
      });
    });
  };
  handleChangePage = (event: { target: { value: string } }) => {
    firebase.getDoc("pages", event.target.value).then((doc) => {
      this.setState({ page: doc });
    });
  };
  handleChangeContent = (
    index: number,
    item: { type: string; text: string },
  ): void => {
    const content = this.state.page.content.map(
      (el: { type: string; text: string }, i: number) => {
        return i === index ? item : el;
      },
    );
    this.setState({
      disabled: false,
      page: { ...this.state.page, content: content },
    });
  };
  handleSubmit = () => {
    firebase.updateDocData("pages", this.state.page.title, {
      content: this.state.page.content,
    });
    this.setState({ disabled: true });
  };
  handleNewType = (event: { target: { value: string } }) => {
    this.setState({ new: { ...this.state.new, type: event.target.value } });
  };
  addElement = () => {
    this.setState({
      new: { show: false },
      page: {
        ...this.state.page,
        content: [
          ...this.state.page.content,
          { type: this.state.new.type, text: "" },
        ],
      },
    });
  };
  componentWillUnmount(): void {
    this.abortController.abort();
  }
  render() {
    return (
      <>
        {this.state && (
          <div className="grid grid-cols-1 gap-6">
            <Form.Elements.Select
              item={{
                type: "Page:",
                options: this.state.pages
                  .filter((page) => {
                    return page.title !== "home";
                  })
                  .map((page) => {
                    return page.title;
                  }),
              }}
              onChange={this.handleChangePage}
            />
            <div>
              <Button
                cta=""
                onClick={() => this.setState({ new: { show: true } })}
                iconId="PlusIcon"
                size="sm"
              />
              <Button
                cta="save"
                onClick={this.handleSubmit}
                iconId="DocumentArrowUpIcon"
                size="sm"
                disabled={this.state.disabled}
              />
            </div>
            {this.state.new.show && (
              <div className="-mx-4 flex gap-8 rounded-lg border border-indigo-500 px-4 py-6">
                <div className="flex-auto">
                  <Form.Elements.Select
                    item={{ type: "Type:", options: ["h1", "h2", "body"] }}
                    onChange={this.handleNewType}
                  />
                </div>
                <div className="flex-initial">
                  <Button
                    cta=""
                    size="sm"
                    iconId="CheckIcon"
                    color_1="emerald-500"
                    color_2="emerald-600"
                    onClick={this.addElement}
                  />
                  <br />
                  <Button
                    cta=""
                    size="sm"
                    iconId="XMarkIcon"
                    color_1="red-600"
                    color_2="red-700"
                    onClick={() => this.setState({ new: { show: false } })}
                  />
                </div>
              </div>
            )}
            {this.state.page.content.map(
              (item: { type: string; text: string }, index: number) => {
                switch (item.type) {
                  case "h1":
                  case "h2":
                    return (
                      <Form.Elements.Input
                        item={item}
                        index={index}
                        key={this.state.page.title + "-" + index}
                        onChange={this.handleChangeContent}
                      />
                    );
                  case "body":
                    return (
                      <Form.Elements.Textarea
                        item={item}
                        index={index}
                        key={this.state.page.title + "-" + index}
                        onChange={this.handleChangeContent}
                      />
                    );
                }
              },
            )}
          </div>
        )}
      </>
    );
  }
}

export default Admin;
