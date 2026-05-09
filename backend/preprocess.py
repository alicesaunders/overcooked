import re
import os
import string
from backend.utils import units
from nltk.corpus import stopwords
from datasets import load_dataset, Dataset
import json
from hashlib import sha1

class RecipeDatasetLoader:
    def __init__(self,
                 dataset_name: str = "nuhuibrahim/recifine", 
                 split: str = "train", 
                 assign_id: bool = False,
                 batch_size: int = 5, 
                 testing: bool = False):
        
        self.dataset_name = dataset_name
        self.split = split
        self.batch_size = batch_size

        self.dataset_dict = load_dataset(dataset_name)

        if split not in self.dataset_dict:
            raise ValueError(
                'Split {} not in dataset. Choose from {}'.format(split,list(self.dataset_dict.keys())))

        self.dataset = self.dataset_dict[split]

        # Testing only
        if testing:
            self.dataset = self.dataset.select(range(batch_size))

        if assign_id:
            self.generate_ids()

    def generate_ids(self):
        def add_ids_batched(batch):
            batch["id"] = [sha1(link.strip().encode("utf-8")).hexdigest() for link in batch["link"]][:12]
            return batch

        self.dataset = self.dataset.map(
            add_ids_batched,
            batched=True,
            num_proc=4)
            
        return self
            

class PreprocessText:
    def __init__(self,
                 dataset: Dataset,
                 use_stopword_removal: bool= True):

        self.dataset = dataset

        self.use_stopword_removal = use_stopword_removal
        self.default_stopwords = stopwords.words('english')

        self.special_char_pattern = re.compile(r'[{}0-9]'.format(re.escape(string.punctuation.replace('-', ''))))

    def remove_special_characters(self, text):
        return self.special_char_pattern.sub('', text)
    
    def remove_stopwords(self, text):
        words = text.split()
        filtered = [w for w in words if w not in self.default_stopwords]
        return ' '.join(filtered)
    
    def clean_text(self, text: str) -> str:

        text = text.strip()
        text = text.lower()
        text = self.remove_special_characters(text)

        if self.use_stopword_removal:
            text = self.remove_stopwords(text)

        text = re.sub(r'\s+', ' ', text).strip()
        return text
    
    def preprocess_texts(self, batch):
        
        titles = batch["title"]
        ingredients = batch["ingredients"]
        
        combined = [f"{t} {i}" for t, i in zip(titles, ingredients)]
        
        cleaned = [self.clean_text(x) for x in combined]

        return {"search_text": cleaned}
    
    def save_data(self, processed_data, output_path: str):

        if output_path:
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            with open(output_path, 'w') as f:
                json.dump(processed_data, f)
            print('Pre-processed data saved to {}'.format(output_path))
         

# Testing classes
loader = RecipeDatasetLoader(dataset_name="nuhuibrahim/recifine",split="train", testing=True, batch_size=5, assign_id=True)
print(len(loader.dataset))
print(loader.dataset[0])

preprocessor = PreprocessText(loader.dataset, use_stopword_removal=False)
samples = preprocessor.preprocess_texts(loader.dataset)
print(samples)

processed_dataset = loader.dataset.map(preprocessor.preprocess_texts, batched=True)
print(processed_dataset["search_text"][0])
print(type(processed_dataset["search_text"][0]))
