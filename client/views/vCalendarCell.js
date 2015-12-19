var vCalendarCell = Backbone.View.extend({
    className: 'cell',
    template: _.template($('#calendarCell_tpl').html(), {variable: 'data'}),

    render: function() {
        this.$el.html(this.template(this.model));
        if (this.model.mod)
            this.$el.addClass(this.className + '_' + this.model.mod);

        return this;
    }
});