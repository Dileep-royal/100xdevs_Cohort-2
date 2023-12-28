const {readFile, writeFile} = require('fs/promises')

async function fileCleaner(fileName) {
  try{
  const onlyWords = []
  const wordsFromFile = (await readFile(fileName,'utf-8')).split(" ");
  for (const word of wordsFromFile) {
    if (word!='') onlyWords.push(word);
  }
  let sentence=onlyWords.join(" ");
  await writeFile(fileName, sentence);
  console.log("Successfully done cleaning the file...");
  }
  catch(err){
    console.log("Error Occured while cleaning the file: " + err);
  }
}

// function to remove extra whitespace from a file
fileCleaner('fileInput.txt'); // pass a file name