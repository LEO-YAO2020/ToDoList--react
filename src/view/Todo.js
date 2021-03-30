import React, { Component } from "react";
import { Link } from "react-router-dom";
import store from "../store/index";
import "./todo.css";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.storeChange = this.storeChange.bind(this);
    store.subscribe(this.storeChange);
  }
  render() {
    return (
      <div className="main">
        <div className="form">
          <table>
            <tbody>
              <tr>
                <td>Description:</td>
                <td>
                  <input
                    type="text"
                    className="des"
                    onChange={this.changeDescription.bind(this)}
                  />
                </td>
              </tr>
              <tr>
                <td>Category: </td>
                <td>
                  <select
                    className="sel"
                    onChange={this.changeCategory.bind(this)}
                  >
                    <option className="firstOption"> </option>
                    <option>html</option>
                    <option>css</option>
                    <option>js</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Content:</td>
                <td>
                  <textarea
                    name="cont"
                    className="content"
                    onChange={this.changeContent.bind(this)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <button
                    onClick={() => {
                      const action = {
                        type: "addList",
                      };
                      store.dispatch(action);
                      var Description = document.querySelector(".des");
                      var Category = document.querySelector(".firstOption");
                      var Content = document.querySelector(".content");
                      Description.value = "";
                      Category.selected = true;
                      Content.value = "";
                    }}
                  >
                    Submit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="todo">
          <button
            onClick={() => {
              var checkbox = document.querySelectorAll(".checkBox");
              var arr = [];

              for (let i = 0; i < checkbox.length; i++) {
                if (checkbox[i].checked) {
                  arr.push(i);
                  checkbox[i].checked = false;
                }
              }
              let action = {
                type: "deleteItem",
                value: arr,
              };
              store.dispatch(action);
            }}
          >
            Delete Selected
          </button>
          <table>
            <thead>
              <tr>
                <td>
                  <input type="checkbox" id="cball" />
                </td>
                <th>Description</th>
                <th>Category</th>
                <th>Operate</th>
              </tr>
            </thead>
            <tbody>
              {this.state.list.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <input type="checkbox" className="checkBox" />
                    </td>
                    <th>
                      <Link to={"/list/" + index}>{item.Description}</Link>
                    </th>
                    <th>{item.Category}</th>
                    <th>
                      <span
                        onClick={(index) => {
                          const action = {
                            type: "deleteOne",
                            value: index,
                          };
                          store.dispatch(action);
                        }}
                      >
                        {this.state.d}
                      </span>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  storeChange() {
    this.setState(store.getState());
  }

  /**
   * 这里的2个事件绑定直接用react的方式写在JSX的标签上就可以了,否则需要考虑如何清理这些事件处理函数
   * all[i].onclick, 当all[i]元素被删除时，需要all[i].onclick = null 解绑事件，垃圾回收才能将原来的
   * 事件处理函数回收，释放内存。
   * 当然这些并不影响效果的实现。
   */
  componentDidUpdate() {
    var fir = document.querySelector("#cball");
    var all = document.querySelectorAll(".checkBox");
    fir.onclick = function () {
      for (let i = 0; i < all.length; i++) {
        all[i].checked = this.checked;
      }
    };
    for (let i = 0; i < all.length; i++) {
      all[i].onclick = function () {
        var flag = true;
        for (let j = 0; j < all.length; j++) {
          if (!all[j].checked) {
            flag = false;
          }
        }
        fir.checked = flag;
      };
    }
  }

  changeDescription(e) {
    const action = {
      type: "changeDescription",
      value: e.target.value,
    };
    store.dispatch(action);
  }
  changeCategory(e) {
    console.log(e.target.value);
    const action = {
      type: "changeCategory",
      value: e.target.value,
    };
    store.dispatch(action);
  }
  changeContent(e) {
    const action = {
      type: "changeContent",
      value: e.target.value,
    };
    store.dispatch(action);
  }
}
export default Todo;
