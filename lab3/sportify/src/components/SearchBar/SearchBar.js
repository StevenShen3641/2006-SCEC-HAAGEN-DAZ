import { useState, useEffect } from "react";
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

const SearchBar = ({
  setAddress,
  setCenter,
  setShowFilter,
  searchAction,
  filterToggle,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    // set the visibility to true after a delay to trigger the transition
    const timeout = setTimeout(() => {
      setIsVisible(true);
    });

    return () => clearTimeout(timeout);
  }, []);

  function userLocationClick() {
    setValue('')
    setShowFilter(false)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
        setAddress('Your Location1')
      });
    } else {
      console.log("Geolocation not supported");
    }
  }

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
    <>
    <div className={`${styles.search} gradual ${isVisible ? "visible" : ""}`}>
      <Combobox onSelect={handleSelect} className={styles.combobox}>
        <ComboboxInput
          placeholder={"Search for address"}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setComboboxList(true);
            setAddress("");
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
      <div className={styles.button} onClick={userLocationClick}>
        <img width="100" height="100" src="https://img.icons8.com/ios-filled/50/center-direction.png" alt="center-direction"/>
      </div>
      <div className={styles.button} onClick={searchAction}>
        <img src={SearchIcon} alt="search"></img>
      </div>
    </div>
    </>
  );
};

export default SearchBar;
