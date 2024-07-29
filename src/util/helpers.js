const fs = require("fs").promises;

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

const addToFile = async (filePath, dataToAppend) => {
  fs.appendFile(filePath, dataToAppend, (err) => {
    if (err) {
      console.error("Error writing to file", err);
    } else {
      console.log("Data appended successfully!");
    }
  });
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
  countNonEmptyLines,
  addToFile,
  getNumsFromFile,
};
