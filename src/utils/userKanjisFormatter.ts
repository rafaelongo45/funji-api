interface UserInfo {
  id: number
  username: string
  profileImage: string
  usersKanjis: any[]
}

export function formatUserInfo(userInfo: UserInfo){
  const kanjisArr = userInfo.usersKanjis.map((kanji) => {
    const name = kanji.kanji
    return name
  });
  const data = {
    id: userInfo.id,
    username: userInfo.username,
    profileImage: userInfo.profileImage,
    kanjis: kanjisArr
  }
  return data;
}