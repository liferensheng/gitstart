import  {CLICK} from "./type.js";
import getters from "./getter.js";

const  state={
  count:20
};

const mutations={
  [CLICK](state){
    state.count/2;
  }
}


export default{
  state,
  mutations
}
