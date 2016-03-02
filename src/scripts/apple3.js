function Apple3(type) {
    this.type = type;
    this.color = "red";
}

Apple3.prototype.getInfo = function () {
    return this.color + ' ' + this.type + ' apple';
};


