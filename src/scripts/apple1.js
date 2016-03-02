function Apple1(type) {
    this.type = type;
    this.color = "red";
    this.getInfo = getApple1Info;
}

// anti-pattern! keep reading...
function getApple1Info() {
    return this.color + ' ' + this.type + ' apple';
}