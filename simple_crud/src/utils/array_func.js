// 배열 맨 마지막 인덱스에 데이터를 추가하는 함수.
export const add_obj_at_last = (array, obj) => {
    if(Array.isArray(array)){
        let tmp_array = array.slice();
        tmp_array.push(obj);
        return tmp_array;
    } else return array;
}

// 배열의 값만 복사하여 새로운 배열을 반환하는 함수.
export const array_copy = (array) => {
    if(Array.isArray(array)) return array.slice();
    else return array;
}

// prop 와 기준 값으로 데이터를 찾는 함수.
export const find_idx_with_prop_and_pivot_value = (array, prop, pivot_value) => {
    if(Array.isArray(array)){
        return array.map(m => m[prop]).indexOf(pivot_value);
    } else return -1;
}

// 각 객체 배열 안에 있는 값을 prop 와 value 로 추가하기 위한 함수.
export const insert_each_obj_with_prop_value = (array, prop, value) => {
    if(Array.isArray(array))
        return array.map(obj => ({ ...obj, [ prop ] : value }));
    else return array;
}

// 인덱스로 배열 요소 삭제하는 함수.
export const remove_by_idx = (array, idx) => {
    if(Array.isArray(array)){
        let tmp_array = array.slice();
        tmp_array.splice(idx, 1);
        return tmp_array;
    } else return array;
}