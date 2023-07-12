import { Credentials, Kdbx, ProtectedValue } from 'kdbxweb';
import { ChangeEvent, FC, useEffect, useState } from 'react';

const App: FC = () => {
  const [selectedKeepassFile, setSelectedKeepassFile] = useState<File | null>(null);

  const handleOnKeepassFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedKeepassFile(e.target.files?.item(0) ?? null);
  };

  useEffect(() => {
    const readKeepassFile = async () => {
      if (selectedKeepassFile !== null) {
        const buffer = await selectedKeepassFile.arrayBuffer();

        const credentials = new Credentials(ProtectedValue.fromString('demo'));

        const db = await Kdbx.load(buffer, credentials);

        console.log(db.getDefaultGroup());
      }
    };

    readKeepassFile();
  }, [selectedKeepassFile]);

  return (
    <div className='App'>
      <input type='file' onChange={handleOnKeepassFileChange} />
    </div>
  );
};

export default App;
