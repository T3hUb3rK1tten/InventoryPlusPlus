function graphMonth(divid, monthamount,title) {
        
         var points = new Array();
        
        for(var i =0; i <monthamount.length;i++)
        {
            points.push([i,monthamount[i]]);
            
        }
        
        var ser = new Array();
        ser.push({name:title, data:points});
        
        
        var chart;
        chart = new Highcharts.Chart({
            chart: {
                renderTo: divid,
                type: 'line'
            },
            title: {
                text: 'Amount of '+title
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: 'Amount'
                }
            },
            tooltip: {
                enabled: false,
                formatter: function() {
                    return '<b>'+ this.series.name +'</b><br/>'+
                        this.x +': '+ this.y +'°C';
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: ser
        });
    }
    
function graphDay(divid, dayamount,title) {
        
     var points = new Array();
        
    for(var i =0; i <dayamount.length;i++)
    {
        points.push([i+1,dayamount[i]]);
            
    }
        
        var ser = new Array();
        ser.push({name:title, data:points});
        
        
        var chart;
        chart = new Highcharts.Chart({
            chart: {
                renderTo: divid,
                type: 'line'
            },
            title: {
                text: 'Amount of '+title
            },
            xAxis: {
                 title: {
                    text: 'Day'
                }
                //categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: 'Amount'
                }
            },
            tooltip: {
                enabled: false,
                formatter: function() {
                    return '<b>'+ this.series.name +'</b><br/>'+
                        this.x +': '+ this.y +'°C';
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: ser
        });
}