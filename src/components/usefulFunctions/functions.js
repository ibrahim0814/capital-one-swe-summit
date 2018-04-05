//these are functions that i used recurrently in multiple js files 

module.exports = {

    //simply creates a proper chartjs obj and returns it to be filled with data
    DefaultChartObject: () => {
        const obj = {
            labels: [],
            datasets: [{
                label: '',
                data: [],
                backgroundColor: '#3873ae',
                hoverBackgroundColor: 'salmon',
                
            }]
        }
        return obj;
    },

    //check to see if disposition is bad
    BadValue: (finalDisposition) =>{
        return finalDisposition === 'No Merit' ||
        finalDisposition === 'Cancelled' 
    }
 }

