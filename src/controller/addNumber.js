const fs = require("fs").promises;
const fileA = "./files/A.txt";
const fileB = "./files/B.txt";
const fileC = "./files/C.txt";
const fileD = "./files/D.txt";

const addNumber = async (req, res, next) => {
  try {
    const num = req.params.num;
    const comp = 7 * num;

    const isAnyFileEmpty = await isThereAnyFileEmpty();
    if (!isAnyFileEmpty) {
      console.log(isAnyFileEmpty);
      res.status(200).send({
        success: false,
        message: `All files have number so number not added`,
      });
      return;
    }

    let fileName = null;
    if (comp > 140) {
      addToFile(fileA, num + "\n");
      fileName = "A";
    }

    if (comp > 100) {
      addToFile(fileB, num + "\n");
      fileName = "B";
    }

    if (comp > 60) {
      addToFile(fileC, num + "\n");
      fileName = "C";
    }

    if (comp <= 60) {
      addToFile(fileD, num + "\n");
      fileName = "D";
    }

    const response = {
      success: true,
      message: "Data added successfully.",
      data: {
        num,
        fileName,
      },
    };
    res.status(200).send(response);
  } catch (err) {
    console.error("Error appeared to get number", err);
  }
};

const addToFile = async (filePath, dataToAppend) => {
  fs.appendFile(filePath, dataToAppend, (err) => {
    if (err) {
      console.error("Error writing to file", err);
    } else {
      console.log("Data appended successfully!");
    }
  });
};

const isThereAnyFileEmpty = async () => {
  const fileList = [fileA, fileB, fileC, fileD];
  let emptyFiles = 0;

  for (const file of fileList) {
    const count = await countNonEmptyLines(file);
    if (count == 0) {
      return true;
    }
  }

  return false;
};

const countNonEmptyLines = async (file) => {
  try {
    const data = await fs.readFile(file, "utf8");
    const lines = data.split("\n");
    const nonEmptyLines = lines.filter((line) => line.trim() !== "");
    const count = nonEmptyLines.length;

    console.log(`Number of non-empty lines in ${file}: ${count}`);
    return count;
  } catch (err) {
    console.error("Error reading the file:", err);
    return 0;
  }
};

module.exports = {
  addNumber,
};
