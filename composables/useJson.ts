export const useJson = (obj : object, printFullObject : boolean = false) => {
  if(printFullObject) {
    console.log(JSON.parse(JSON.stringify(obj)));
  } else {
    console.log(JSON.parse(JSON.stringify(obj)).data?._value);
  }
  
}