const $ = require('jquery');

export default class Pagination {
    constructor(tableManager) {
        this.tableManager = tableManager;
        let containers = tableManager.table.find('.table-pagination');
        if (containers.length !== 0) {
            this.containers = containers;
            this.active = true;
            this.initialized = false;
        } else {
            this.active = false;
        }
    }

    hide() {
        if (this.active === true) {
            this.containers.each(function() {
                $(this).hide();
            });
        }
    }

    init(data) {
        this.state = {};
        this.state.first = typeof data.first !== "undefined" ? data.first : true;
        this.state.last = typeof data.last !== "undefined" ? data.last : true;
        this.state.page = typeof data.number !== "undefined" ? data.number : 0;
        this.state.size = typeof data.size !== "undefined" ? data.size : 50;
        this.state.numberOfElements = typeof data.number_of_elements !== "undefined" ? data.number_of_elements : 0;
        this.state.totalElements = typeof data.total_elements !== "undefined" ? data.total_elements : 0;
        this.state.totalPages = typeof data.total_pages !== "undefined" ? data.total_pages : 1;

        let lastPageSize = (this.state.totalElements % this.state.size);
        this.state.lastPageElements = (lastPageSize === 0) ? this.state.size : lastPageSize;

        this.initialized = true;

        return this;
    }

    click(event) {
        event.preventDefault();

        let button = $(event.target);
        $(event.target).addClass("disabled");

        if (button.hasClass('paginator-first')) {
            this.clickFirst();
        }

        if (button.hasClass('paginator-previous')) {
            this.clickPrevious();
        }

        if (button.hasClass('paginator-next')) {
            this.clickNext();
        }

        if (button.hasClass('paginator-last')) {
            this.clickLast();
        }

        this.updateStateFirstPage();
        this.updateStateLastPage();
    }

    clickFirst() {
        this.tableManager.loadNextPage(this.tableManager.dataUrl);
        this.state.page = 0;
    }

    clickPrevious() {
        let urlSplit = this.tableManager.dataUrl.split('?');
        let queryParam = (urlSplit.length > 1 && urlSplit[1] !== '') ? '&' : '?';
        let id = this.tableManager.table.find('tbody tr:first').attr('data-id');

        this.tableManager.loadNextPage(this.tableManager.dataUrl + queryParam + 'to=' + id);
        this.state.page--;
    }

    clickNext() {
        let urlSplit = this.tableManager.dataUrl.split('?');
        let queryParam = (urlSplit.length > 1 && urlSplit[1] !== '') ? '&' : '?';
        let id = this.tableManager.table.find('tbody tr:last').attr('data-id');

        this.tableManager.loadNextPage(this.tableManager.dataUrl + queryParam + 'from=' + id);
        this.state.page++;
    }

    clickLast() {
        let urlSplit = this.tableManager.dataUrl.split('?');
        let queryParam = (urlSplit.length > 1 && urlSplit[1] !== '') ? '&' : '?';

        this.tableManager.loadNextPage(this.tableManager.dataUrl + queryParam + 'to=last&size='+this.state.lastPageElements);
        this.state.page = this.state.totalPages - 1;
    }

    updateStateFirstPage() {
        this.state.first = (this.state.page === 0);
    }

    updateStateLastPage() {
        this.state.last = (this.state.page === this.state.totalPages - 1);
    }

    render() {
        var pagination = this;
        this.containers.each(function () {
            $(this).empty();

            let container = $(this);

            let details = $(document.createElement('span'));
            details.addClass('pagination-details');
            details.html("Showing page " + (pagination.state.page+1) + " of " + pagination.state.totalPages);

            let buttons = $(document.createElement('span'));
            buttons.addClass('float-right');

            let buttonList = $(document.createElement('ul'));
            buttons.append(buttonList);

            let firstButton = $(document.createElement('li'));
            let firstButtonLink = pagination.renderButton('first');
            firstButtonLink.click(pagination.click.bind(pagination));
            if (pagination.state.first === true) {
                firstButtonLink.addClass('disabled');
            }
            firstButton.append(firstButtonLink);
            buttonList.append(firstButton);

            let previousButton = $(document.createElement('li'));
            let previousButtonLink = pagination.renderButton('previous');
            previousButtonLink.click(pagination.click.bind(pagination));
            if (pagination.state.first === true) {
                previousButtonLink.addClass('disabled');
            }
            previousButton.append(previousButtonLink);
            buttonList.append(previousButton);

            let nextButton = $(document.createElement('li'));
            let nextButtonLink = pagination.renderButton('next');
            nextButtonLink.click(pagination.click.bind(pagination));
            if (pagination.state.last === true) {
                nextButtonLink.addClass('disabled');
            }
            nextButton.append(nextButtonLink);
            buttonList.append(nextButton);

            let lastButton = $(document.createElement('li'));
            let lastButtonLink = pagination.renderButton('last');
            lastButtonLink.click(pagination.click.bind(pagination));
            if (pagination.state.last === true) {
                lastButtonLink.addClass('disabled');
            }
            lastButton.append(lastButtonLink);
            buttonList.append(lastButton);

            container.append(details);
            container.append(buttons);
        });
    }

    renderButton(id) {
        let lastButtonLink = $(document.createElement('a'));

        lastButtonLink.attr('href', '#');
        lastButtonLink.addClass('paginator');
        lastButtonLink.addClass('paginator-' + id);
        lastButtonLink.html(id);

        return lastButtonLink;
    }
}
