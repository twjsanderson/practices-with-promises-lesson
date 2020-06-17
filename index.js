const fs = require("fs").promises;

// fs used to mock async behaviour 

// helper
const readText = (fileName) => {
    return fs.readFile(fileName, 'utf8');
};

const stepOne = () => {
    readText("long.txt").then((data) => {
        console.log(data.length);
    })
    readText("short.txt").then((data) => {
        console.log(data.length);
    })
};

const stepTwo = () => {
    readText("long.txt").then((data) => {
        console.log(data.length);
        readText("short.txt").then((data) => {
            console.log(data.length);
        })
    });
};

// When chaining promises if we return a value in the first then,
// the next chained then has access to it
// .then() actually resolves then promise 
const stepThree = () => {
    readText("long.txt")
        .then((data) => {
            console.log(data.length);
            return readText("short.txt");
        })
        .then((data) => {
            console.log(data.length);
        })
};

const stepThreeBonus = async () => {
    const long = await readText("long.txt");
    const short = await readText("short.txt");

    console.log(long.length, short.length);
};


// print sum of both lengths
const stepFour = () => {
    const readTexts = (file1, file2) => {
        return readText(file1)
            .then((data1) => {
                return readText(file2).then((data2) => {
                    return [data1, data2];
                })
            })
    };

    readTexts("long.txt", "short.txt").then(([data1, data2]) => {
        console.log(data1.length + data2.length);
    })
};

// waits until all args have finished and returns data in order given
// if any error out the catch will grab and error out
const stepFive = () => {
    Promise.all([readText("long.txt"), readText("short.txt")]).then(([longData, shortData]) => {
        console.log(longData.length + shortData.length)
    })
}

const stepSix = () => {
    Promise.all([readText("long.txt"), readText("short.txt")]).then(([longData, shortData]) => {
        console.log(longData.length + shortData.length)
    }).catch((error) => {
        console.log(error)
    })
};

const stepSeven = () => {
    readText("long1.txt").then((data) => {
        console.log(data.length);
    }).catch((error) => {
        console.log(error)
    })
};


// with chained promises any error will trigger the final catch()
const stepEight = () => {
    readText("long.txt")
        .then((data) => {
            console.log(data.length);
            return readText("short1.txt");
        })
        .then((data) => {
            console.log(data.length);
            return readText("short.txt");
        })
        .then((data) => {
            console.log(data.length);
        })
        .catch((err) => {
            console.log(err);
        })
}

// if any fail the whole thing fails
const stepNine = () => {
    Promise.all([readText("short.txt"), readText("short.txt"), readText("long1.txt")]).then((data) => {
        console.log(data)
    }).catch((error) => {
        console.log(error)
    })
};

// handle errors and continue working
const stepTen = () => {
    return readText("short1.txt")
        // .then() used as learning helper, not needed
        .then(data => data)
        .catch(error => {
            if (error.code === 'ENOENT') {
                return ''
            } else {
                throw error;
            }
        })
        .then(data => console.log(data.length))
};

// helper 2, throw key word acts like return if error isnt handled later 
const safeReadText = (fileName) => {
    return readText(fileName)
        .catch(error => {
            if (error.code === 'ENOENT') {
                return ''
            } else {
                throw error;
            }
        })
};

const stepEleven = (fileName) => {
    return safeReadText(fileName)
        .then((data) => {
            console.log(data.length)
        })
        .catch((error) => {
            console.log(error)
        })
}

const stepTwelve = () => {
    Promise.all([safeReadText("long.txt"), safeReadText("short.txt"), safeReadText("short1.txt")])
        .then(([longData, shortData, fakeData]) => {
            console.log(longData.length + shortData.length + fakeData.length)
        }).catch((error) => {
            console.log(error)
        })
}

stepTwelve();