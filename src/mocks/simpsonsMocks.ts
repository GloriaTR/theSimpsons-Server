import mongoose from "mongoose";
import { type SimpsonStructure } from "../database/models/types.js";

export const simpsonIdMock = new mongoose.Types.ObjectId().toString();

export const simpsonsMock: SimpsonStructure[] = [
  {
    _id: simpsonIdMock,
    name: "Marge Simpson",
    background:
      "Marjorie Marge B. Simpson ,  (de soltera Bouvier ; nacida el 19 de marzo  ), es la feliz ama de casa y madre de tiempo completo de la familia Simpson . Con su esposo Homer , tiene tres hijos: Bart , Lisa y Maggie Simpson . Marge es la fuerza moralista en su familia y, a menudo, proporciona una voz fundamental en medio de las payasadas de su familia al tratar de mantener el orden en la casa de los Simpson. Aparte de sus deberes en el hogar, Marge coqueteó brevemente con una serie de carreras que van desde oficial de policía hasta activista contra la violencia.",
    image:
      "https://res.cloudinary.com/dglqojivj/image/upload/v1682559694/simpsons/250px-Marge_Simpson_ivadwr.png",
    gender: "Femenino",
    status: "Vivo",
    occupation: "Ama de casa",
  },
  {
    _id: new mongoose.Types.ObjectId().toString(),
    name: "Herb Powell",
    background:
      "Herbert Powell es el medio hermano mayor de Homer Simpson . Nacido ilegítimamente de Abe Simpson y Gaby , fue criado por la familia Powell y creó una inmensa riqueza gracias a su compañía de automóviles.",
    image:
      "https://res.cloudinary.com/dglqojivj/image/upload/v1682559693/simpsons/250px-Herbert_Powell_xsndsz.png",
    gender: "Masculino",
    status: "Vivo",
    occupation: "Empresario CEO y presidente de Powell Motor Company",
  },
];
