// 验证用户名是否为字母和数字组合
export function validateUsername(value:string) {
  if(value == null || value===''){
    return '请输入用户名'
  }
  const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(value) || '用户名只能包含字母和数字';
}

// 验证密码是否为6-12位字符
export function validatePassword(value:string) {
  if(value == null || value===''){
    return '请输入密码'
  }
  if (value.length < 6 || value.length > 12) {
    return '密码长度必须在6-12位之间';
  }
  return true;
}

// 验证两次输入的密码是否一致
export function validateConfirmPassword(value:string, password:string) {
  if(value == null || value===''){
    return '请输入确认密码'
  }
  if (value !== password) {
    return '两次输入的密码不一致';
  }
  return true;
}

// 验证年龄是否在18-100之间
export function validateAge(value:string) {
  if(value == null || value===''){
    return '请输入年龄'
  }
  const age = parseInt(value, 10);
  if (isNaN(age) || age < 18 || age > 100) {
    return '年龄必须在18-100之间';
  }
  return true;
}
