import computeStyle from "./computeStyle";

export default ( ele, prop ) => parseInt( computeStyle( ele, prop ), 10 ) || 0;
