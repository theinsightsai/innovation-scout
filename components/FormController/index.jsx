"use client";
import {
  TextField,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

const ErrorSection = ({ touched, errors, fieldName }) => {
  return (
    <div className="italic">
      {touched?.[fieldName] && errors?.[fieldName] ? (
        errors?.[fieldName]
      ) : (
        <div className="invisible">invisible text</div>
      )}
    </div>
  );
};

const FormController = ({
  fieldObj,
  values,
  touched,
  errors,
  setFieldValue,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDown = (event) => event.preventDefault();

  return (
    <>
      {fieldObj?.component === "TEXT" && (
        <TextField
          key={fieldObj?.id}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id={fieldObj.id}
          label={fieldObj.label}
          name={fieldObj.id}
          autoComplete={fieldObj.id}
          onChange={(event) => setFieldValue(fieldObj.id, event.target.value)}
          autoFocus
          value={values?.[fieldObj.id]}
          error={touched?.[fieldObj.id] && Boolean(errors?.[fieldObj.id])}
          helperText={
            <ErrorSection
              fieldName={fieldObj.id}
              touched={touched}
              errors={errors}
            />
          }
          style={{ marginTop: "2px", fontFamily: "Outfit, sans-serif" }}
        />
      )}
      {fieldObj?.component === "PASSWORD" && (
        <TextField
          key={fieldObj?.id}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name={fieldObj.id}
          label={fieldObj.label}
          type={showPassword ? "text" : "password"}
          id={fieldObj.id}
          autoComplete={fieldObj.id}
          onChange={(event) => setFieldValue(fieldObj.id, event.target.value)}
          value={values?.[fieldObj.id]}
          error={touched?.[fieldObj.id] && Boolean(errors?.[fieldObj.id])}
          helperText={
            <ErrorSection
              fieldName={fieldObj.id}
              touched={touched}
              errors={errors}
            />
          }
          sx={{ marginTop: "0px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDown}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          style={{ fontFamily: "Outfit, sans-serif" }}
        />
      )}
      {fieldObj?.component === "LABEL_CHECK" && (
        <FormControlLabel
          control={
            <Checkbox
              value={values?.[fieldObj.id]}
              color="primary"
              onChange={(event, value) => setFieldValue(fieldObj.id, value)}
            />
          }
          label={fieldObj?.label}
        />
      )}
    </>
  );
};
export default FormController;
