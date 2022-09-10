const { format } = require("date-fns")

function HTMLDateFormat(date) {
    return format(new Date(date), 'yyyy-MM-dd')
}

function AgeFormat(dateBirth) {
    return new Date().getFullYear() - dateBirth.slice(0,4)
}

module.exports = { HTMLDateFormat, AgeFormat }