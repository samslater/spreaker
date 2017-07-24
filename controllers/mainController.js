angular.module('app').controller('MainController', ['$scope', 'UtilityService', 'DataService', '$timeout', function ($scope, UtilityService, DataService, $timeout) {

    $scope.currentBlock = 0;

    var currentBlockWordArrayIndex = 0;
    var studySpeed = 300;
    var defaultStrikes = 3;

    $scope.formTitle = "";
    $scope.formContent = "";

    $scope.firstLetterString = "";

    $scope.correctAnswerShow = false;
    $scope.speedStudyShow = false;
    $scope.showWordOptions = true;
    $scope.cheatCurrentBlock = true;

    $scope.passages = DataService.passages;

    function speedStudy(array, start, stop, speed) {

        $scope.speedStudyFullText = array.join(' ');

        var position = start;

        $scope.speedStudyShow = true;
        $scope.speedStudyItem = array[start];

        $timeout(function () {
            position = position + 1;
            cycle();
        }, speed);

        function cycle() {
            if (position < array.length + 1 && position < stop) {
                $timeout(function () {
                    $scope.speedStudyItem = array[position];
                    position = position + 1;
                    cycle();
                }, speed);
            } else {
                $scope.speedStudyShow = false;
            }
        }
    }

    function getBlocks(array) {
        var blocks = [];
        var lastIndex = 0;
        var newBlockArr = [];
        for (var i = 0; i < array.length; i++) {
            newBlockArr.push(array[i]);
            if (((i - lastIndex > 10) && (array[i].indexOf('.') != -1)) || i - lastIndex > 100 || i == array.length - 1) {
                var newBlock = {
                    start: lastIndex,
                    startWord: array[lastIndex],
                    stop: i,
                    stopWord: array[i],
                    arr: newBlockArr,
                    firstLetterString: getFirstLetters(newBlockArr)
                };
                blocks.push(newBlock);
                newBlockArr = [];
                lastIndex = i + 1;
            }
        }
        return blocks;
    }

    function getFirstLetters(array) {
        var firstLetters = '';
        for (var i = 0; i < array.length; i++) {
            firstLetters = firstLetters + array[i].charAt(0);
        }
        return firstLetters;
    }

    function setAnswerArray() {
        $scope.currentOptions = [];
        $scope.currentOptions.push(angular.copy($scope.currentPassage.blocks[$scope.currentBlock].arr[currentBlockWordArrayIndex]));
        for (var i = 4; i > 0; i--) {
            var randIndex = UtilityService.getRandomInt(0, ($scope.currentPassage.arr.length - 1));
            $scope.currentOptions.push(angular.copy($scope.currentPassage.arr[randIndex]));
        }
        UtilityService.shuffle($scope.currentOptions);
    }

    function resetCurrentBlock() {
        $scope.strikes = defaultStrikes;
        $scope.currentPassage.blocks[$scope.currentBlock].answers = [];
        currentBlockWordArrayIndex = 0;
        $scope.firstLetterString = "";
    }

    function postAnswer(answerCorrect) {

        if (answerCorrect) {

            currentBlockWordArrayIndex = currentBlockWordArrayIndex + 1;

            $scope.currentPassage.blocks[$scope.currentBlock].answers = $scope.currentPassage.blocks[$scope.currentBlock].arr.slice(0, currentBlockWordArrayIndex);
            $scope.firstLetterString = $scope.currentPassage.blocks[$scope.currentBlock].firstLetterString.slice(0, currentBlockWordArrayIndex);

            if (currentBlockWordArrayIndex == $scope.currentPassage.blocks[$scope.currentBlock].arr.length) {

                alert('Great job! You finished this block.');
                if ($scope.currentBlock == $scope.currentPassage.blocks.length - 1) {
                    $scope.currentOptions = [];
                    alert('Congratulations! You finished the entire passage!');
                } else {
                    $scope.currentBlock = $scope.currentBlock + 1;
                    resetCurrentBlock();
                    setAnswerArray();
                }
            } else {
                setAnswerArray();
            }

        } else {

            $scope.correctAnswer = $scope.currentPassage.blocks[$scope.currentBlock].arr[currentBlockWordArrayIndex];
            $scope.correctAnswerShow = true;
            $timeout(function(){
                $scope.correctAnswerShow = false;
            }, studySpeed);

            $scope.firstLetterString = $scope.currentPassage.blocks[$scope.currentBlock].firstLetterString.slice(0, currentBlockWordArrayIndex);

            $scope.strikes = $scope.strikes - 1;

            if ($scope.strikes == 0) {
                resetCurrentBlock();
                alert('Oops, time to start over.');
            }

            setAnswerArray();
        }


    }

    $scope.passageSelect = function (passage) {

        passage.arr = passage.content.split(' ');
        // speedStudy(passage.arr, 0, 99999, 300);
        passage.blocks = getBlocks(passage.arr);
        passage.firstLetterString = getFirstLetters(passage.arr);
        $scope.currentPassage = passage;
        resetCurrentBlock();
        setAnswerArray();

    };

    $scope.studyCurrentBlock = function () {
        speedStudy($scope.currentPassage.blocks[$scope.currentBlock].arr, 0, $scope.currentPassage.blocks[$scope.currentBlock].arr.length + 1, studySpeed);
    };

    $scope.answerButtonClick = function (answer) {
        postAnswer($scope.currentPassage.blocks[$scope.currentBlock].arr[currentBlockWordArrayIndex] == answer);
    };

    $scope.firstLetterTyped = function (firstLetterString) {
        if (typeof $scope.firstLetterString != 'undefined') {
            postAnswer($scope.currentPassage.blocks[$scope.currentBlock].firstLetterString.toUpperCase().indexOf($scope.firstLetterString.toUpperCase()) == 0);
        }
    };

    $scope.currentBlockChange = function () {

        $scope.firstLetterString = '';

        for (var i = 0; i < $scope.currentPassage.blocks.length; i++) {
            if (i < $scope.currentBlock) {
                $scope.currentPassage.blocks[i].answers = $scope.currentPassage.blocks[i].arr;
            } else {
                $scope.currentPassage.blocks[i].answers = [];
            }
        }

        resetCurrentBlock();
        setAnswerArray();

    };

    // $scope.reset = function () {
    //     $scope.currentPassage = {};
    //     $scope.currentBlock = 0;
    //     currentBlockWordArrayIndex = 0;
    // };

    $scope.passageFormSave = function () {
        var newPassage = {
            title: $scope.formTitle,
            content: $scope.formContent
        };
        $scope.passages.push(newPassage);
        $scope.formTitle = "";
        $scope.formContent = "";
    };


}]);
