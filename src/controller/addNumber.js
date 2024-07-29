const fileA = "./files/A.txt";
const fileB = "./files/B.txt";
const fileC = "./files/C.txt";
const fileD = "./files/D.txt";
const { countNonEmptyLines } = require("../util/helpers");

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

const isThereAnyFileEmpty = async () => {
  const fileList = [fileA, fileB, fileC, fileD];

  for (const file of fileList) {
    const count = await countNonEmptyLines(file);
    if (count == 0) {
      return true;
    }
  }

  return false;
};

module.exports = {
  addNumber,
};
