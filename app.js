function operate(operation,a,b){ 
  if(operation=='+'){
    return a+b;
  }
  else if(operation=='-'){
    return a-b;
  }
  else if(operation=='X'){
    return a*b;
  }
  else if(operation=='/'){
    return b==0 ? "Bruh get your stuff together." : a/b;
  }
  else if(operation=='^'){
    return Math.pow(a,b);
  }
}

str='';

non_displayable=['+/-','=', 'DEL','AC'];
operators=['+','-','X','/','^'];
numbers=['0','1','2','3','4','5','6','7','8','9','.'];

result=document.getElementById('result');
btns=document.querySelectorAll('button');
btns.forEach((button)=>{
  button.addEventListener('click',()=> {
    if (numbers.indexOf(button.textContent) in numbers)
      number_clicked(button);
    if(operators.indexOf(button.textContent) in operators)
      operator_clicked(button);
    if(non_displayable.indexOf(button.textContent) in non_displayable)
      non_displayable_clicked(button);
    if(button.textContent=='=')
      find_result();
    if (button.textContent=='.')
      check_dots();
    result.textContent=str;
  });
});

function number_clicked(button){
  str+=button.textContent;
}

function operator_clicked(button){
  a=parseFloat(str);
  if (isNaN(a) || (operators.indexOf(str[str.length-2]) in operators))
    return;
  str+=' '+ button.textContent+' ';
  if (count_operations(str)>1){
    str=str.slice(0,str.length-3);
    find_result();
    str+=' '+ button.textContent+' ';
  }
  seperator=str.length-1;  //Division between operand and operator
  operation=button.textContent;  //What operation.
}

function non_displayable_clicked(button){
  if(button.textContent=='DEL')
    str=str.slice(0,str.length-1);
  if(button.textContent=='AC')
    str='';
  if(button.textContent=='+/-' && count_operations(str)===0){
    console.log('entered');
    if(parseFloat(str)>0){
      str='-'+str
    }
    else{
      str=str.slice(1,str.length);
    }
  }

}

function count_operations(str){
  if (str[0]!='-')
    return ((str.split('')).filter((x)=>operators.indexOf(x) in operators)).length;
  return ((str.split('')).filter((x)=>operators.indexOf(x) in operators)).length - 1;
}

function find_result(){
  first_operand=parseFloat(str.slice(0,seperator));
  second_operand=parseFloat(str.slice(seperator+1,str.length));
  if (isNaN(first_operand) || isNaN(second_operand) || (operators.indexOf(str[str.length-2]) in operators))
    return;
  solution=operate(operation,first_operand,second_operand)
  str=(round_to_two(solution)).toString();
}

function check_dots(){
  count_dots_whole=str.split('').filter((x)=>x=='.').length;
  if (count_operations(str)==0 && count_dots_whole>1){
    str=str.slice(0,str.length-1);
  }
  else if(count_operations(str)>0){
    count_dots_second=str.slice(seperator+1,str.length).split('').filter((x)=>x=='.').length;
    if (count_dots_second>1)
      str=str.slice(0,str.length-1);
  }
}

function round_to_two(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}