function getProductNames(data, category) {
    let filteredData = data.filter(function(d) {
        return d["Product Category"] == category;
    });

    let nameSet = new Set();
    for (f of filteredData) {
        nameSet.add(f["Product description (HS)"]);
    }
    return Array.from(nameSet);
}

function getProductNameWithoutCategory(data) {
    let nameSet = new Set();
    for (f of data) {
        nameSet.add(f["Product description (HS)"]);
    }
    return Array.from(nameSet);
}

function getMaxWaterCostByState(data, color, regionList) {
    let filteredData = data.filter(function(d) {
        return d["Water Status"] == color;
    });

    let max = 0;
    for (item of filteredData) {
        for (region of regionList) {
            if (item[region] !== "undefined" && max < Number(item[region])) {
                max = Number(item[region]);
            }
        }
    }
    return max;
}

function getMaxWaterCost(data, color, regionList) {
    let filteredData = data.filter(function(d) {
        return d["Water Status"] == color;
    });

    let max = 0;
    for (item of filteredData) {
        let total = 0;
        for (region of regionList) {
            if (item[region] !== "undefined") {
                total += Number(item[region]);
            }
        }
        if (total > max) {
            max = total;
        }
    }
    return max;
}

function getTotalWaterCost(item, regionList) {
    let total = 0;

        for (region of regionList) {
            if (!isNaN(item[region])) {
                total += Number(item[region]);
            }
        }
    return total;
}

function filterByRegion(data, regionList) {
    let newData = data.map(function(d) {
    
        var temp = {
            "Product description (HS)": d["Product description (HS)"], 
            "Product Category": d["Product Category"], 
            "Water Status": d["Water Status"],
            "US Average": d["US Average"],
            "Global Average": d["Global Average"]
        }

        for (region of regionList) {
            temp[region] = d[region];
        }

        return temp;
    })
    return newData;
}

function getUsTotalAverageByColor(data, color) {
    let filteredData = data.filter(function(d) {
        return d["Water Status"] == color;
    });

    let total = 0;
    console.log(filteredData)
    for (item of filteredData) {
        total += Number(item["US Average"]);
    }
        console.log(total);   
    return total;

}

function getGlobalTotalAverageByColor(data, color) {
    let filteredData = data.filter(function(d) {
        return d["Water Status"] == color;
    });

    let total = 0;
    console.log(filteredData)
    for (item of filteredData) {
        total += Number(item["Global Average"]);
    }
        console.log(total);   
    return total;

}