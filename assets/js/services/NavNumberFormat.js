export default class NavNumberFormat {
    format(x, decimals = true) {
        if (typeof x === "undefined") {
            return false;
        }

        let parts = x.toString().split(".");

        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        if (decimals === false) {
            return parts[0];
        }

        if (typeof parts[1] !== 'undefined') {
            parts[1] = '<small>' + parts[1] + '</small>';
        }

        return parts.join(".");
    }

    formatNav(x, decimals = true) {
        let number = this.format(x, decimals);
        if (number === false) {
            return false;
        }

        return number + " NAV";
    }
}