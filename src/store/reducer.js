const defaultState = {
  Description: "",
  Category: "",
  Content: "",
  list: [],
  d: "delete",
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case "changeDescription":
      let newState = JSON.parse(JSON.stringify(state));
      newState.Description = action.value;
      return newState;
    case "changeCategory":
      let newState2 = JSON.parse(JSON.stringify(state));
      newState2.Category = action.value;
      return newState2;
    case "changeContent":
      let newState5 = JSON.parse(JSON.stringify(state));
      newState5.Content = action.value;
      return newState5;
    case "addList":
      let newState3 = JSON.parse(JSON.stringify(state));
      let states = {
        Description: newState3.Description,
        Category: newState3.Category,
        Content: newState3.Content,
      };
      newState3.list.push(states);
      newState3.Description = "";
      newState3.Category = "";
      newState3.Content = "";
      return newState3;
    case "deleteItem":
      let newState4 = JSON.parse(JSON.stringify(state));
      let arr = action.value;

      /**
       * splice 并不是一个纯函数，它会修改数组，返回被删除的元素。所以删除的bug并不是因为什么异步的原因，而是因为没有搞清楚splice的行为
       * 假如有一个数组：【1,2,3,4];要删除第3，4个元素，arr=[2,3]，按你这里的写法
       * 第一次循环 i = 0; [1,2,3,4].splice(arr[0],1); 原数组变成 [1,2,4];
       * 第二次循环 i = 1; [1,2,4].splice(arr[1],1); arr[1] === 3, 数组此时根本没有第三个元素，所以不会有任何变化
       */
      let newArr = newState4.list;
      for (let k of arr) {
        // const index = Array.prototype.findIndex(newState4.list,item=>item)

        newArr = newArr.filter(
          (item) => item.Description != newState4.list[k].Description
        );
        console.log(newArr);
      }
      newState4.list = newArr;
      return newState4;
    case "deleteOne":
      let newState6 = JSON.parse(JSON.stringify(state));
      newState6.list.splice(action.value, 1);
      return newState6;
  }
  return state;
};
