export function calculerAge(dateNaissance) {
    const dateNaissanceObj = new Date(dateNaissance);
    const aujourdHui = new Date();
    let age = aujourdHui.getFullYear() - dateNaissanceObj.getFullYear();
    const mois = aujourdHui.getMonth() - dateNaissanceObj.getMonth();
    
    if (mois < 0 || (mois === 0 && aujourdHui.getDate() < dateNaissanceObj.getDate())){
      age--;
    }
  
    return age;
  }
  