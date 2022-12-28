window.onload = () => {

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // let data = new FormData(loginForm)
        // console.log(data);
        const email = inputs[0].value;
        const pass  = inputs[1].value;

        const user = {
            email    : email,
            password : pass
        }
        const requestOptions = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        };
        fetch("http://localhost:3030/login", requestOptions)
            .then(async response => {
                const res = await response.text();
                if (res && res != 'user not found') {
                    window.location = "http://localhost:3030/games";
                } else {
                    error.hidden = false;
                }
            })
    })
}
const inputs    = document.getElementsByTagName('input');
const loginForm = document.getElementById('form');
