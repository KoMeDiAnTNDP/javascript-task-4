'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
const isStar = false;
const events = {};

/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    return {

        /**
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @returns {Object} this
         */
        on: function (event, context, handler) {
            if (!events.hasOwnProperty(event)) {
                events[event] = [];
            }

            events[event].push(({ context, handler }));

            return this;
        },

        /**
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         * @returns {Object} this
         */
        off: function (event, context) {
            Object.keys(events)
                .filter(eventName =>
                    eventName === event || (new RegExp(`^${event}.`)).test(eventName))
                .forEach(eventName => {
                    events[eventName] = events[eventName]
                        .filter(lecturer => lecturer.context !== context);
                });

            return this;
        },

        /**
         * Уведомить о событии
         * @param {String} event
         * @returns {Object} this
         */
        emit: function (event) {
            const subEvents = event.split('.');

            while (subEvents.length > 0) {
                const curEvent = subEvents.join('.');

                if (events.hasOwnProperty(curEvent)) {
                    events[curEvent].forEach(student =>
                        student.handler.call(student.context));
                }

                subEvents.pop();
            }

            return this;
        },

        /**
         * Подписаться на событие с ограничением по количеству полученных уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} times – сколько раз получить уведомление
         * @returns {Object} this
         */
        several: function (event, context, handler, times) {
            console.info(event, context, handler, times);

            return this;
        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         * @returns {Object} this
         */
        through: function (event, context, handler, frequency) {
            console.info(event, context, handler, frequency);

            return this;
        }
    };
}

module.exports = {
    getEmitter,

    isStar
};
