import { Session } from "@inrupt/solid-client-authn-browser";
import { getSolidDataset, saveFileInContainer } from "@inrupt/solid-client";
import { MarkerDTO } from "../shared/shareddtypes";
import { json } from "body-parser";
import { writeFile } from 'fs/promises';
import { getFile, isRawData, getContentType, getSourceUrl, isContainer, getResourceInfo } from "@inrupt/solid-client";
import { Place } from "../shared/shareddtypes";
import { number } from "yargs";

async function addMarkerPOD(session: Session, name: string, file: File, url: string) {

  try {
    await saveFileInContainer(url, file, {
      slug: file.name,
      contentType: file.type,
      fetch: session.fetch
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getMarkersPOD(session: Session, url: string): Promise<Place[]> {
  let arraySol: Place[] = [];
  let lug: any;
  if (session.info.isLoggedIn) {

    //Buscamos los elementos hijos del contenedor
    const fet = session.fetch;
    const file = await getFile(
      url,               // File in Pod to Read
      { fetch: fet }       // fetch from authenticated session
    );

    let fileText = await file.text()

    var hijosCarpetaMap = fileText.split("ldp:contains")[1].split(";")[0].replaceAll(">","").replaceAll("<","").replaceAll(" ","").split(",");
    
    for(var i = 0; i<hijosCarpetaMap.length; i++){
      lug = await readFileFromPod(url + hijosCarpetaMap[i], session);
      if (lug) {
        arraySol.push(lug);
      }
    }
  }

  console.log(arraySol);
  return Promise.resolve(arraySol);
}

async function readFileFromPod(fileURL: string, session: Session) {
  try {
    const fet = session.fetch;
    const file = await getFile(
      fileURL,               // File in Pod to Read
      { fetch: fet }       // fetch from authenticated session
    );

    let fileText = await file.text()
    let fileInfo = JSON.parse(fileText)

    let n = fileInfo.name;
    let d = fileInfo.direction;
    let lat = Number(fileInfo.latitude);
    let lon = Number(fileInfo.longitude);
    let cate = fileInfo.category;
    let com = fileInfo.comments;
    let photoLink = fileInfo.photoLink;
    let rat = fileInfo.rating;

    let p: Place = {
      name: n,
      direction: d,
      latitude: lat,
      longitude: lon,
      comments: com,
      photoLink: photoLink,
      category: cate,
      rating: rat
    }

    console.log(`Fetched a ${getContentType(file)} file from ${getSourceUrl(file)}.`);
    console.log(`The file is ${isRawData(file) ? "not " : ""}a dataset.`);

    return p;

  } catch (err) {
    console.log(err);
    return null;
  }
}

export default { addMarkerPOD, getMarkersPOD };