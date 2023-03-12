const environ = process.env.NODE_ENV

if (environ == 'production') {
    const baseUrl = ''
}
else {
    const baseUrl = 'http://localhost:8000'
}