const fs = require("fs").promises;
const fileA = "./files/A.txt";
const fileB = "./files/B.txt";
const fileC = "./files/C.txt";
const fileD = "./files/D.txt";

const showAllNumbers = async (req, res, next) => {
  try {
    const files = [fileA, fileB, fileC, fileD];
    const data = [];

    for (const file of files) {
      const numbers = await getNumsFromFile(file);
      data.push(numbers);
    }

    const response = {
      success: true,
      message: "Report generation details.",
      data: {
        A: data[0],
        B: data[1],
        C: data[2],
        D: data[3],
      },
    };
    res.status(200).send(response);
  } catch (err) {
    console.error("Error appeared in getting all Numbers", err);
  }
};

const getNumsFromFile = async (file) => {
  try {
    const data = await fs.readFile(file, "utf8");
    const lines = data.split("\n");
    const numbers = lines
      .filter((line) => line.trim() !== "")
      .map((line) => parseInt(line));

    return numbers;
  } catch (err) {
    console.error("Error reading the file:", err);
  }
};

module.exports = {
  showAllNumbers,
};
