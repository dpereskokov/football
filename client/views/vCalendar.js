

var vCalendar = Backbone.View.extend({
    template: _.template($('#calendar_tpl').html(), {variable: 'data'}),
    className: 'calendar',

    initialize: function () {
        /* In fact, the data should arrive here from the controller, which should fetch data from the data-adapter.
        The collection view shouldn't initialize it's own data.
        But because of it is a demo project targeted on css knowledge I decide to neglect this rule and fulfill collection with manual data. You will find shitty code in this method. */
        this.collection = [
            {
                Title: 'Понедельник, 25',
                Description: ''
            },
            {
                Title: 'Вторник, 26',
                Description: ''
            },
            {
                Title: 'Среда, 27',
                Description: ''
            },
            {
                Title: 'Четверг, 28',
                Description: ''
            },
            {
                Title: 'Пятница, 1',
                Description: ''
            },
            {
                Title: 'Суббота, 2',
                Description: '',
                mod: 'current'
            },
            {
                Title: 'Воскресенье, 3',
                Description: ''
            }
        ];
        for (var i=4; i<=31; i++) {
            var data = {
                Title: i,
                Description: ''
            };
            this.collection.push(data);
            if (i==9) {
                data.Description = 'Напиться!<br />Витя Костин, Петр Михайлов';
                data.mod = 'scheduled';
            }
            if (i==22) {
                data.Description = 'ДР!<br />Дима Молодцов';
                data.mod = 'scheduled';
            }
        }
    },

    render: function() {
        this.$el.html(this.template(_.extend({
            /* Localized texts should be here */
            ADD: 'Добавить',
            RELOAD: 'Обновить',
            EVENT_DATE_MEMBER: 'Событие, дата или участник',
            TODAY: 'Сегодня',

            Date: 'Март 2013'
        })));

        var $content = this.$el.find('.table .content');
        this.collection.forEach(function (model) {
            var cellView = new vCalendarCell({
                model: model
            });

            $content.append(cellView.render().$el);
        }, this);


        return this;
    }
});