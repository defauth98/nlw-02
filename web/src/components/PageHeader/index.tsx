import React from 'react';

import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';
import { useAuth } from '../../contexts/auth';

interface PageHeaderProps {
  title?: string;
  description?: string;
  perfil?: boolean;
  pageTitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  children,
  title,
  description,
  pageTitle,
}) => {
  const { user } = useAuth();

  function renderTitleOrPerfil() {
    if (title) {
      return (
        <div className="header-content">
          <strong>{title}</strong>
          {children}
          {description && <p>{description}</p>}
        </div>
      );
    }
    return (
      <div className="header-content header-image">
        <img
          src="https://avatars3.githubusercontent.com/u/52966246?s=460&u=42fc97534542db683f3daab62ce627e92bef846f&v=4"
          alt="Imagem de perfil"
          className="perfil-image"
        />

        <h1 className="perfil-name">
          {`${user?.name} ${user?.surname}` || 'Not found'}
        </h1>
        <h3 className="perfil-subject">Matemática</h3>
      </div>
    );
  }

  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={backIcon} alt="Voltar" />
        </Link>
        <span>{pageTitle}</span>
        <img src={logoImg} alt="Proffy" />
      </div>

      {renderTitleOrPerfil()}
    </header>
  );
};

export default PageHeader;
