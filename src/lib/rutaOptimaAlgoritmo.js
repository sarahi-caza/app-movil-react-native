
const rutaOptimaAlgoritmo = (nodos) => {
    let distanciaMinima = null
    let rutaMinima = null
    let puntosIntermedios = Object.keys(nodos).filter(x => x != 'start' && x != 'finish'  ) 
    let data = permutacion(puntosIntermedios);
    
    data.forEach((x,index) => {
        let distancia = 0
        for (let i=0; i<x.length; i++ ){
            if(i==0){
                //calculo de tiempo entre start y puntos intermedios
                distancia = distancia+nodos['start'][x[i]].tiempo
            } 
            if (i==x.length-1){
                //Calculo de tiempo entre puntos intermedios al final
                distancia = distancia+nodos[x[i]].finish.tiempo
            } else {
                //calculo de tiempo entre los puntos intemedios
                distancia = distancia+nodos[x[i]][x[i+1]].tiempo
            }
        }
        if(index === 0 || distancia < distanciaMinima) {
            distanciaMinima = distancia
            rutaMinima = x
        }
        console.log('PERMUTACION====>',x, distancia)
    })
    const grafico = []
    for (let index=0; index<rutaMinima.length; index++){
        if(index==0){
            grafico.push(nodos[rutaMinima[index]][rutaMinima[index+1]].origen)
            grafico.push(nodos[rutaMinima[index]][rutaMinima[index+1]].destino)
        }else if (index<rutaMinima.length-1){
            grafico.push(nodos[rutaMinima[index]][rutaMinima[index+1]].destino)
        }
    }

    console.log('RUTAMINIMA======>:',  rutaMinima, distanciaMinima)
    return grafico
}
const permutacion = (x) => {
        let resultado = [];
        let recursividad = (i, nums) => {
          if(i===nums.length){
            resultado.push(nums.slice());
            return;
          }  
          for(let j = i; j < nums.length; j++){
            [nums[i],nums[j]] = [nums[j],nums[i]];
            recursividad(i+1, nums);
            [nums[i],nums[j]] = [nums[j],nums[i]];
          }
        }
        recursividad(0, x);
        
        return resultado;
    };
//rutaOptima(nodos);

export default rutaOptimaAlgoritmo