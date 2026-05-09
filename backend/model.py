from sentence_transformers import SentenceTransformer

class SentenceEmbeddings:
    def __init__(self, 
                 model_name: str = 'sentence-transformers/all-MiniLM-L6-v2',
                 device: str = None,
                 batch_size: int = 32,
                 ):
        
        self.model_name = model_name
        self.model = SentenceTransformer(model_name, device=self.device)
        self.device = device
        self.batch_size = batch_size

        print('Model {} loaded on {}'.format(self.model_name, self.device))

        def change_model(self, model_name: str):
            self.model = SentenceTransformer(model_name, device=self.device)
            self.model_name = model_name

            print('Model changed to {}'.format(model_name))

        def generate_embeddings(self):
            pass


## Testing model
# Load pre-trained model
model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

# Calculate embeddings by calling model.encode()
embeddings = model.encode(cleaned_sentences)
print(embeddings.shape)
# [3, 384]

# Calculate the embedding similarities
similarities = model.similarity(embeddings, embeddings)
print(similarities)
# tensor([[1.0000, 0.6660, 0.1046],
#         [0.6660, 1.0000, 0.1411],
#         [0.1046, 0.1411, 1.0000]])