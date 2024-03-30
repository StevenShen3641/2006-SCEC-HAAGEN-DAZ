import { useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import styles from "../../assets/SearchBar.module.css";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import SearchIcon from "../../assets/search.svg";
import FilterIcon from "../../assets/filter-.svg";

const SearchBar = ({ isVisible, address, setAddress, setCenter, searchAction, filterToggle }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  const [comboboxList, setComboboxList] = useState(true);

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setAddress(address);
    setCenter({ lat: lat, lng: lng });
    setComboboxList(false);
  };

  return (
    <div className={`${styles.search} ${styles.gradual} ${isVisible ? styles.visible : ""} ${styles.warning}`}>
    <Combobox  onSelect={handleSelect} >
      <ComboboxInput
        placeholder={"Search for address"}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setComboboxList(true)
          setAddress('')
        }}
        
        disabled={!ready}
      />
      {comboboxList && (
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      )}
    </Combobox>
    <div className={styles.button} onClick={filterToggle}>
          <img src={FilterIcon} alt="filter"></img>
    </div>
      <div
          className={styles.button}
          onClick={searchAction}>
        <img src={SearchIcon} alt="search"></img>
      </div>
      </div>
  );
};

export default SearchBar;
