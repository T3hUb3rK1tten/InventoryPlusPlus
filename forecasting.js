//By: Nelson LeDuc

//CONSTANTS
var MONTHS_IN_YEAR = 12;
var MONTH_INDEX = 0;
var DAY_INDEX = 1;
var YEAR_INDEX = 2;

//VARIABLES
var rawJSON = loadJSONData(); //inital JSON data
var parsedJSON = parseJSON(rawJSON); //parsed JSON

//test calls

var t = getKeys();/*s
for(var l = 0; l < t.length; l++)
{
	testData(getYearlyDataAverage(12, t[l]));
}*/

var ta1 = getYearlyData(12, t[0]);
var ta2 = getYearlyData(12, t[1]);

testData(getProjectedMonth(11, 12, t[0]));


//PUBLIC METHODS
//Should be used from outside

//returns the list of keys for the arrays
function getKeys()
{
	var productKeys = new Array();
	for( var i in parsedJSON)
	{
		productKeys.push(i);
	}
	
	//document.write(productKeys);
	return productKeys;
}

//returns the values of the data for the month
function getMonthlyData(month, year, key)
{
	//console.log(parsedJSON["Tomatoes"]);
	return dataPerMonth(parsedJSON[key], month, year);
}

//returns the values of the data for the year
function getYearlyData(year, key)
{
	return dataPerYear(parsedJSON[key], year);
}

//returns the average of each month for the year
function getYearlyDataAverage(year, key)
{
	return dataPerYearAverage(parsedJSON[key], year);
}

//returns the projected monthly data for the given month
//also returns the days that are lower than the previous years
function getProjectedMonth(month, year, key)
{
	var pArray = dataPercentChange(month, getYearlyData(year - 1, key), getYearlyData(year, key)); //array of percents for both years
	//var average = averageOfArray(pArray); //average percent change
	
	var regressionForm = dataLinearRegression(pArray);
	var average = regressionForm[0] + regressionForm[1] * month;
	
	var month = getMonthlyData(month, year - 1, key); //monthly data of the previous year
	var lowMonth = new Array(); //save the previous year's month
	var lowDays = new Array(); //all the days with lower than previous
	
	//loops through and multiplies each value from year-1 by the average change
	for(var i = 0; i < month.length; i++)
	{
		lowMonth.push(Math.round(month[i] * average));
	}
	
	//loops through and finds all the days that are projected lower than the previous month
	for(var i = 0; i < month.length; i++)
	{
		if(lowMonth[i] - month[i] < 0)
			lowDays.push(1);
		else
			lowDays.push(0);
	}
	
	return [lowMonth, lowDays];
}

//PRIVATE METHODS
//DO NOT USE THESE!!! Data will be missing

//returns the sum of each month in a year
function dataPerYear(productArray, year)
{
	var dateArray = getDates(productArray); //gets an array of the date ex: [11, 9, 12] or November 9th, 2012
	var yearData = new Array(MONTHS_IN_YEAR); //data for each month of the year
	
	//loops through and fills the array with each monthly sum
	for(var i = 1; i <= yearData.length; i++)
	{
		var tempMonth = dataPerMonth(productArray, i, year); //finds each month's data
		var monthSum = sumOfArray(tempMonth); //monthly sum
		yearData[i-1] = monthSum;
	}
	//document.write(yearData);
	
	return yearData;
}

function dataLinearRegression(array)
{
	var x = new Array(); //x values
	var xyA = new Array(); //x * y array
	var xSq = new Array(); //squared x values array
	var ySq = new Array(); //squared y values array
	
	var a; //linear regression a
	var b; //linear regression b
	
	//loops through and fills the regression arrays
	for(var i = 0; i < array.length; i++)
	{
		var xVal = i +1;
		x.push(xVal); //x values
		xyA.push(array[i] * xVal); //x * y fill
		xSq.push(xVal * xVal); //x^2 fill
		ySq.push(array[i] * array[i]); //y^2 fill
	}
	
	//console.log(array, x, xyA, xSq, ySq);
	
	var aTop = sumOfArray(array) * sumOfArray(xSq) - sumOfArray(x) * sumOfArray(xyA);
	var aBot = array.length * sumOfArray(xSq) - sumOfArray(x) * sumOfArray(x);
	a = aTop / aBot;
	
	var bTop = array.length * sumOfArray(xyA) - sumOfArray(x) * sumOfArray(array);
	//var bBot = array.length * sumOfArray(xSq) - sumOfArray(x) * sumOfArray(x);
	b = bTop / aBot;
	
	return [a, b];
	
}

//returns an array of the percent change of each month for the year
function dataPercentChange(month, year1, year2)
{
	//checks if both arrays are equal in length
	if(year1.length != year2.length)
		return;
	
	year1 = year1.slice(0, month-1);
	year2 = year2.slice(0, month-1);
	
	var percentArray = new Array(); //array of percentages
	
	//loops through each month and adds the percent to the array
	for(var k = 0; k < year1.length; k++)
	{
		var val = year2[k] / year1[k];
		percentArray.push(val);
	}
	
	return percentArray;
}

//returns the averages for each month in a year
function dataPerYearAverage(productArray, year)
{
	var dateArray = getDates(productArray); //gets an array of the date ex: [11, 9, 12] or November 9th, 2012
	var yearData = new Array(MONTHS_IN_YEAR); //monthly data in the year
	
	//loops and fills the array with monthly averages
	for(var i = 1; i <= yearData.length; i++)
	{
		var tempMonth = dataPerMonth(productArray, i, year); //monthly data
		var monthSum = averageOfArray(tempMonth); //monthly averages
		yearData[i-1] = monthSum;
	}
	//document.write(yearData);
	
	return yearData;
}

//returns the average of all the values in the array
function averageOfArray(array)
{
	//checks if the array exists
	if(array == null)
		return;
		
	var n = 0; //average
	var c = 0; //number of non-zeroes
	
	//loops through and finds the array sum
	for(var i = 0; i < array.length; i++)
	{
		n += array[i]; //sum
		
		//non-zero counter
		if(array[i] > 0)
			c++;
	}
	
	//finds the average if there is a value
	if(n != 0)
		n = n / c;
	
	return n;
}

//returns the sum of all the values in the arrays
function sumOfArray(array)
{
	//checks if array exists
	if(array == null)
		return;
		
	var n = 0; //sum
	
	//returns the array's sum
	for(var i = 0; i < array.length; i++)
	{
		n += array[i]; //sum
	}
	
	//document.write(n + "*");
	
	return n;
}

//splits the string of dates into an array
function getDates(productArray)
{
	var dateArray = new Array(); //array of the date

	//loops through and splits the date into an array
	for(var n = 0; n < productArray.length; n++)
	{
		var tempArray = productArray[n][0].split("/"); //parses string to array
		dateArray.push(tempArray); //adds to top of array
	}
	
	return dateArray;
}

//returns the total values of the given month
function dataPerMonth(productArray, month, year) //returns an array of values for the given month from the data
{
	var dateArray = getDates(productArray); //gets an array of the date ex: [11, 9, 12] or November 9th, 2012
	
	var lengthOfMonth = 0; //highest number of days in the month
	
	/*finds the latest date in the given month
	for(var i = 0; i < dateArray.length; i++)
	{
		//checks if the value is greater than the current greatest, as well as the proper year and month
		if(parseInt(dateArray[i][DAY_INDEX]) > lengthOfMonth 
			&& parseInt(dateArray[i][MONTH_INDEX]) == month
			&& parseInt(dateArray[i][YEAR_INDEX]) == year)
		{
			lengthOfMonth = parseInt(dateArray[i][DAY_INDEX]); //finds the latest date
		}
	}*/
	var monthLength = daysInMonth(month);
	
	var valuesByDay = new Array(monthLength); //array of values for the month
	
	//fills the values array with zeroes
	for(var i = 0; i < valuesByDay.length; i++)
	{
		valuesByDay[i] = 0; //fill zeroes
	}
	
	//sets the values of each given date from the data
	for(var i = 0; i < productArray.length; i++) //loops through all the data values
	{
		if(parseInt(dateArray[i][MONTH_INDEX]) == month && parseInt(dateArray[i][YEAR_INDEX]) == year) //checks the month
		{
			var v = parseInt(dateArray[i][DAY_INDEX]) - 1; //finds the day at the given product value
			var temp = parseInt(valuesByDay[v]) + parseInt(productArray[i][DAY_INDEX]); //sets the new value at the day
			valuesByDay[v] += parseInt(productArray[i][DAY_INDEX]); //adds value to day
		}
	}
	
	//testData(valuesByDay); //test the array values
	return valuesByDay;
}

//gets the initial JSON data
function loadJSONData()
{
	var array = {"Tomatoes":{
		"2012-11-01":"10",
		"2012-11-02":"20",
		"2012-11-03":"30",
		"2012-11-04":"40",
		"2012-11-05":"50",
		"2012-11-06":"60",
		"2012-11-07":"70",
		"2012-11-08":"80",
		"2012-11-09":"90",
		"2012-11-10":"100",
		"2012-11-11":"110",
		"2012-11-12":"120",
		"2012-11-13":"130",
		"2012-11-14":"140",
		"2012-11-15":"150",
		"2012-11-16":"160",
		"2012-11-17":"170",
		"2012-11-18":"180",
		"2012-11-19":"190",
		"2012-11-20":"200",
		"2012-11-21":"210",
		"2012-11-22":"220",
		"2012-11-23":"230",
		"2012-11-24":"240",
		"2012-11-25":"250",
		"2012-11-26":"260",
		"2012-11-27":"270",
		"2012-11-28":"280",
		"2012-11-29":"290",
		"2012-11-30":"300",
		
		"2011-11-01":"10",
		"2011-11-02":"20",
		"2011-11-03":"30",
		"2011-11-04":"40",
		"2011-11-05":"50",
		"2011-11-06":"60",
		"2011-11-07":"70",
		"2011-11-08":"80",
		"2011-11-09":"90",
		"2011-11-10":"100",
		"2011-11-11":"110",
		"2011-11-12":"120",
		"2011-11-13":"130",
		"2011-11-14":"140",
		"2011-11-15":"150",
		"2011-11-16":"160",
		"2011-11-17":"170",
		"2011-11-18":"180",
		"2011-11-19":"190",
		"2011-11-20":"200",
		"2011-11-21":"210",
		"2011-11-22":"220",
		"2011-11-23":"230",
		"2011-11-24":"240",
		"2011-11-25":"250",
		"2011-11-26":"260",
		"2011-11-27":"270",
		"2011-11-28":"280",
		"2011-11-29":"290",
		"2011-11-30":"300",
		
		"2012-01-01":"50",
		"2012-03-01":"50",
		"2012-04-01":"50",
		"2012-05-01":"50",
		"2012-06-01":"50",
		"2012-07-01":"50",
		"2012-08-01":"50",
		"2012-09-01":"50",
		"2012-10-01":"50",
		"2012-02s-01":"50",
		"2012-12-01":"50",
		
		"2011-01-01":"100",
		"2011-03-01":"100",
		"2011-04-01":"100",
		"2011-05-01":"100",
		"2011-06-01":"100",
		"2011-07-01":"100",
		"2011-08-01":"100",
		"2011-09-01":"100",
		"2011-10-01":"100",
		"2011-02-01":"100",
		"2011-12-01":"100"
		},
		"Potatoes":{"2012-02-09":"60"}};
	return array;
}

//parses the JSON data into a more easily workable format
function parseJSON(array)
{
	var dateArray = new Array(); //list of the dates in the JSON
	var valArray = new Array(); //list of the values in the JSON
	
	var dataArray = new Array(); // final data to be returnd
	
	//loops throught the outer array keys
	for(var k in array)
	{
		dateArray = [];
		valArray = [];
		
		//loops through the inner array keys
		for(var i in array[k])
		{
			var nDate = reformatDate(i); //formats the date key
			dateArray.push(nDate); //stores the new date in the array[0]
			valArray.push(parseInt(array[k][i])); //stores the value at the date in the array[1]
		}
	
		var tempContainer = new Array(); //contains [[date,value],...]
	
		//loops through the array of dates and values
		for(var i = 0; i < dateArray.length; i++)
		{
			var tempArray = new Array(); //array with [date, value]
			tempArray.push(dateArray[i]);
			tempArray.push(valArray[i]);
			tempContainer.push(tempArray);
		}
		dataArray[k] = tempContainer;
	}
	
	//console.log(dataArray);
	
	return dataArray;
}

//reformats the date from yyyy-mm-dd into mm-dd-yy
function reformatDate(date)
{
	var array = date.split("-"); //splits at the '-'s
	var rDate = array[1] + "/" + array[2] + "/" + (array[0] - 2000); //reformats the data

	return rDate;
}

//returns the number of days for the given month
function daysInMonth(month)
{
	switch(month)
	{
		case 1:
			return 31; //January
		case 2:
			return 28; //February
		case 3:
			return 31; //March
		case 4:
			return 30; //April
		case 5:
			return 31; //May
		case 6:
			return 30; //June
		case 7:
			return 31; //July
		case 8:
			return 31; //August
		case 9:
			return 30; //September
		case 10:
			return 31; //October
		case 11:
			return 30; //November
		case 12:
			return 31; //December
	}
}

//DEBUG METHODS
//TESTING PURPOSES ONLY

//DEBUG
function testData(dataArray)
{
	for(var i = 0; i < dataArray.length; i++)
	{
		if(dataArray[i] != null)
			document.write((i + 1) + ": " + dataArray[i] + "<br>");
	}
}