const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const courseRoutes = require('./course.routes');
const catagoryRoutes = require('./catagory.routes');
const levelRoutes = require('./level.routes');
const outlineRoutes = require('./outline.routes');
const classRoutes = require('./class.routes');
const scoreRoutes = require('./score.routes');
const introRoutes = require('./introduction.routes');
const scheduleRoutes = require('./schedule.routes');
const contactRoutes = require('./contact.routes');

module.exports = (app) => {
    app.use('/api/auth', authRoutes),
    app.use('/api/user', userRoutes),
    app.use('/api/course', courseRoutes),
    app.use('/api/level', levelRoutes),
    app.use('/api/catagory', catagoryRoutes),
    app.use('/api/class', classRoutes),
    app.use('/api/outline', outlineRoutes),
    app.use('/api/score', scoreRoutes),
    app.use('/api/introduction', introRoutes),
    app.use('/api/schedule', scheduleRoutes),
    app.use('/api/contact', contactRoutes)

}