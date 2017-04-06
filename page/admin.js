const content  = require("../static/admin/admin.ejs");
const html = require("../static/common/html.ejs");
const header = require("../static/common/header.ejs");
const footer = require("../static/common/footer.ejs");

module.exports = html({
    header: header(),
    content: content(),
    footer: footer(),
})