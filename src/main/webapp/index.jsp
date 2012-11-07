<!DOCTYPE html>
<html>
    <head>
        <title>JavaScript setup for a Java world</title>
        <% String property = System.getProperty("env"); %>
        <% if (property != null && property.equals("development")) { %>
        <script type="text/javascript" data-main="js/main" src="js/vendor/require.js"></script>
        <% } else { %>
        <script type="text/javascript" src="build/app.js?v=${buildNumber}"></script>
        <% } %>
    </head>
    <body>
    </body>
</html>

