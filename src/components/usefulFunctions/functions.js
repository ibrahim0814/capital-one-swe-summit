module.exports = {
    DefaultChartObject: () => {
        let obj = {
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

    BadValue: (finalDisposition) =>{
        if(
            finalDisposition === 'No Merit' ||
            finalDisposition === 'Cancelled' 
        ){return true;}
        else{return false;}
    
    }
 }

