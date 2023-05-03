const baseImgUrl =
  "https://firebasestorage.googleapis.com/v0/b/hydrate-r-dye.appspot.com/o";

export const profilePhotos = [
  `${baseImgUrl}/Frame%2010avatar.png?alt=media&token=ce38e29e-73c7-4032-bb95-2cca1721c0fd`,
  `${baseImgUrl}/Frame%2011avatar.png?alt=media&token=de162f43-3137-431e-a467-2787c6f8bb97`,
  `${baseImgUrl}/Frame%2012avatar.png?alt=media&token=56a219bc-b6cd-487a-88ce-2bde005197bd`,
  `${baseImgUrl}/Frame%2013avatar.png?alt=media&token=631ffa71-5343-4c9d-836a-f3317fc029c7`,
  `${baseImgUrl}/Frame%2019avatar.png?alt=media&token=37ad6fb5-9c47-4838-80d1-89af8a857c91`,
  `${baseImgUrl}/Frame%2014avatar.png?alt=media&token=6b799f2d-7030-4af5-96ba-3e6b0de83906`,
  `${baseImgUrl}/Frame%2015avatar.png?alt=media&token=d3dfe3d6-8b63-460e-9345-1f198b4c98c8`,
  `${baseImgUrl}/Frame%2016avatar.png?alt=media&token=0cc70844-4d62-46f3-a7d9-eae2cca0cffc`,
  `${baseImgUrl}/Frame%2017avatar.png?alt=media&token=c43a9715-ec95-4107-ace8-eb1ed1ab99d8`,
];

export const getRandomProfilePhoto = (): string => {
  const randomIndex: number = Math.floor(Math.random() * profilePhotos.length);
  return profilePhotos[randomIndex];
};
