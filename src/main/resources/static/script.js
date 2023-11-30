function ImageToTextConverter() {
    const [extractedText, setExtractedText] = React.useState('');
    const [copyButtonText, setCopyButtonText] = React.useState('Copy');

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        try {
            const response = await fetch('/extractText', {
                method: 'POST',
                body: formData
            });

            const data = await response.text();
            setExtractedText(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const copyText = () => {
        const textArea = document.createElement('textarea');
        textArea.value = extractedText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        setCopyButtonText('Copied!');
        setTimeout(() => {
            setCopyButtonText('Copy');
        }, 2000); // Reset the button text after 2 seconds
    };

    return (
        <div>
            <h1>Image to Text Converter</h1>
            <form onSubmit={handleFormSubmit}>
                <input type="file" name="file" accept="image/*" />
                <input type="submit" value="Submit" />
            </form>

            {extractedText && (
                <div id="resultContainer">
                    <h2>Extracted Text</h2>
                    <pre style={{ fontFamily: 'Courier New, monospace' }}>{extractedText}</pre>
                    <button onClick={copyText}>{copyButtonText}</button>
                </div>
            )}
        </div>
    );
}

ReactDOM.render(<ImageToTextConverter />, document.getElementById('root'));