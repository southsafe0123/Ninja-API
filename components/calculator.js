
const tinhtoan = (a, b , ten) => {
    const soA = Number(a);
    const soB = Number(b);
    let ketqua;
  
    switch(ten){
      case 'cong' : 
      ketqua = soA + soB;
      break;
      case 'tru' :
      ketqua = soA - soB;
      break;
      case 'nhan' :
      ketqua = soA*soB;
      break;
      case 'chia' :
      ketqua = soA/soB;
      break;
    }
    return ketqua;
}
 
module.exports = {tinhtoan}