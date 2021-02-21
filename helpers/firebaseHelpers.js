export const snapshotToArray = (snapshot) => {
  console.log("snapshot ==>", snapshot);
  let returnArr = [];

  snapshot.forEach((childSnapshot) => {
    console.log("childSnapshot", childSnapshot);
    let item = childSnapshot.val();
    console.log("item ===>", item, childSnapshot.key);
    item.key = childSnapshot.key;

    returnArr.push(item);
  });

  return returnArr;
};
