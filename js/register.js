document.getElementById('registration-btn').addEventListener('click', async (event) => {
    event.preventDefault();

    const username = document.getElementById('registration-username').value;
    const email = document.getElementById('registration-email').value;
    const password = document.getElementById('registration-password').value;

    if (validateInputFields(username, email, password)) {
        try {
            const response = await fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password })  // Send the form data as JSON
            });

            // Log the entire response for debugging purposes
            console.log('Response:', response);

            // Check if the response is ok (status code 200-299) and process the response text
            if (response.ok) {
                const responseText = await response.text();  // Get the raw response text
                
                // Try parsing only if there is some content
                if (responseText) {
                    try {
                        const newUser = JSON.parse(responseText);  // Parse the JSON
                        console.log('Usuario Registrado:', newUser);
                        alert('Usuario registrado satisfactoriamente');
                    } catch (parseError) {
                        console.error('Error parsing JSON:', parseError);
                        alert('Error parsing the response. Please try again.');
                    }
                } else {
                    console.log('Empty response from the server.');
                    alert('Usuario registrado satisfactoriamente, pero no hubo contenido en la respuesta.');
                }
            } else {
                // Handle non-OK responses
                const errorText = await response.text();
                console.error('Error:', errorText);
                alert('Fallo el registro del usuario. Código de respuesta: ' + response.status);
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error al enviar el formulario:', error);
            alert('Ha habido un error al completar el registro.');
        }
    } else {
        alert('Por favor llene todos los campos.');
    }
});

// Validation function checks if all fields are filled
function validateInputFields(username, email, password) {
    return username && email && password;  // Returns true if all fields are filled
}
