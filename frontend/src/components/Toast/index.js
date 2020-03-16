import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import clsx from 'clsx';

import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import { withStyles } from '@material-ui/core/styles';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';

import style from './style';

import { toastAction } from '../../actions';
import { toastSelector } from '../../selectors';

class Toast extends Component {
  onClose = () => {
    const { hideToast } = this.props;
    hideToast();
  };

  render() {
    const { toastState, toastMessage, toastVariant, classes } = this.props;
    const toastPosition = { vertical: 'bottom', horizontal: 'left' };

    const variantIcon = {
      success: CheckCircleIcon,
      warning: WarningIcon,
      error: ErrorIcon,
      info: InfoIcon,
    };

    const ToastIcon = variantIcon[toastVariant];

    const toastIcon = toastVariant && (
      <ToastIcon className={clsx(classes.icon, classes.iconVariant)} />
    );

    return (
      <Snackbar
        autoHideDuration={3000}
        open={toastState}
        anchorOrigin={toastPosition}
        onClose={this.onClose}
        transitionDuration={100}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={this.onClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      >
        <SnackbarContent
          className={clsx(classes[toastVariant], classes.icon)}
          message={
            <span id="snackbar-message" className={classes.message}>
              {toastIcon}
              {toastMessage}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={this.onClose}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>,
          ]}
        />
      </Snackbar>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  hideToast: () => dispatch(toastAction.hideToast()),
});

const mapStateToProps = createStructuredSelector({
  toastState: toastSelector.getToastState(),
  toastMessage: toastSelector.getToastMessage(),
  toastVariant: toastSelector.getToastVariant(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(Toast));
