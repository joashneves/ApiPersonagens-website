import { useState, useEffect } from 'react'; 
import styles from './EnviarPersonagem.module.css';
import { useParams } from 'react-router';
import axios from 'axios';
import Compress from 'compress.js';

const EnviarPersonagem = () => {
    // Define o estado para os campos do formulário
    const [nome_franquia, setNome_franquia] = useState('')
    const [nome, setNome] = useState('');
    const [gender, setGender] = useState('');
    const [arquivo, setArquivo] = useState(null);
    const [arquivoPreview, setArquivoPreview] = useState(null); 
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    
    const compress = new Compress();
    useEffect(() => {
        // Carregar o nome da franquia ao carregar o componente
        const fetchFranquia = async () => {
            try {
                const responde_franquia = await axios.get(`${import.meta.env.VITE_REACT_APP_LINK}Franquias/${id}`)
                const data_franquia = responde_franquia.data
                setNome_franquia(data_franquia.name)
            } catch (err) {
                console.log(err)
            }
        };

        fetchFranquia();
    }, [id]);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (!arquivo) {
            setError('Selecione um arquivo para upload.');
            return;
        }
        
        const novoArquivo = await compress.compress(arquivo, {
            size: 4,
            quality: 0.50,
            maxHeight: 600,
            maxWidth: 600,
            resize: true
                })
        console.log("arquivo antigo",arquivo)
        console.log("arquivo novo",novoArquivo)

        const UserName = sessionStorage.getItem('user'); 
        const Password =  sessionStorage.getItem('password'); 
        console.log(UserName, Password)
        const formData = new FormData();
        formData.append('Name_Franquia', nome_franquia);
        formData.append('Name', nome);
        formData.append('Gender', gender);
        formData.append('UserName', UserName);
        formData.append('ArquivoPersonagem', novoArquivo);
        console.log(formData.get("UserName"))
        // Recupera o token do sessionStorage
        const token = sessionStorage.getItem('accessToken');
    
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_LINK}Personagems`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}` // Adiciona o token ao cabeçalho
                    }
                }
            );
            setSuccess('Arquivo cadastrado com sucesso!');
            setError(null);
            window.location.reload();
            setLoading(false);
        } catch (error) { 
            console.log(error.response.status)
            if (error.response?.status === 401) {
                setError('Você não está autorizado a enviar o arquivo, faça login novamente.');
            } else if (error.response?.status === 400){
                setError("Arquivo muito grande, ou nome muito grande no arquivo, altere o nome do arquivo para no minimo 5 digitos")
            } else {
                setError('Ocorreu um erro ao cadastrar o arquivo.');
            }
            setSuccess(null);
            setLoading(false);
        }
    };
    
    const handleFileChange = (e) => {
        const file = e.target.files?.[0] || null;
        setArquivo(file);
        
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setArquivoPreview(reader.result); // Armazena a URL da imagem para o preview
            };
            reader.readAsDataURL(file); // Converte o arquivo em uma URL para exibição
        } else {
            setArquivoPreview(null); // Remove o preview caso o arquivo seja removido
        }
    };

    return (
        <article className={styles.mainCadastrar}>
            <h1>Enviar Personagem</h1>
            <form className={styles.formCadastrar} onSubmit={handleSubmit}>
                <div className={styles.secaoPreencher}>
                    <label htmlFor="nome">Nome:</label>
                    <input
                        className={styles.inputCadastrar}
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>
                <div className={styles.secaoPreencher}>
                    <label htmlFor="gender">Gênero:</label>
                    <select
                        className={styles.inputCadastrar}
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="" disabled>Selecione o Gênero</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Masculino">Masculino</option>
                        <option value="NaoBinario">Não-Binário</option>
                        <option value="Fluido">Fluido</option>
                        <option value="Outros">Outros</option>
                    </select>
                </div>
                <div className={styles.secaoPreencher}>
                    <label htmlFor="arquivo">Imagem:</label>
                    <input
                        className={styles.inputCadastrar}
                        type="file"
                        id="arquivo"
                        accept="image/png, image/jpeg"
                        onChange={handleFileChange}
                    />
                   {arquivoPreview && (
                        <div className={styles.previewContainer}>
                            <img src={arquivoPreview} alt="Pré-visualização da imagem" className={styles.previewImagem} />
                        </div>
                    )}
                </div>
                <button type="submit" className={styles.botaoCadastrar} disabled={loading}>
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </article>
    );
};

export default EnviarPersonagem;